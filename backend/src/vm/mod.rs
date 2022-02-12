// VM
pub mod vm;

pub struct SpectroVM;

impl SpectroVM {
    // initiate firmware and BIOS startup, check devices and disks and attempt to boot from one of them
    // do some minimal setup with the devices like tell them to start() if they have a function like that
    fn start() {}
    // tell devices to do full close()
    // not much else is needed since kernel code should have finalised most of the stuff like writing out cache/outstanding buffers to disk, tell devices to clear temporary data, disconnect networking stuff and connections, logging
    fn shutdown() {}
}

// provide a pseudo term for the user to input events and capture kernel output to UART (i.e. write_volatile to 0x80000000). Interrupts/Exceptions are simulated by going to specific interrupt handlers defined in a GDT that the CPU has the base address of
// given an instruction that causes an interrupt of code X, search the GDT entry X and hand execution to that entry. If that entry is not found, raise a double fault by going to the double fault entry
// if the double fault entry is not found, raise a triple fault. This fault is always defined simply "shut down" or "reset" the system. You can hard code it into the CPU/VM the triple fault
// usually the triple fault is handled by the motherboard firmware. So this can be simulated by the VM

// ----------
// SIMULATOR
// ----------

struct CPUView {
    register_file: Vec<u64>,
}

impl CPUView {
    fn new() -> Self {
        Self {
            register_file: vec![0; 32],
        }
    }

    // given instruction, update registers and memory (technically cache but for now just update RAM each time
    fn handle_operation(&mut self, instruction: u32) -> bool {
        // 1. check instruction format based on opcode
        // little endian, least sig bits at lower addresses i.e. increasing order 0...n-1
        let opcode = instruction & 0x7;

        // R -> arithmetic opcodes, add, xor, mul...
        // I -> immediate opcodes, addi, lw, jalr, slli...
        // S -> store opcodes, sw, sb, sh
        // SB -> branch opcodes, beq, bge
        // U -> upper immediate opcodes, lui, auipc. NOTE upper imm is 20bits, not 18
        // UJ -> jump opcodes, jal, jalr

        const R_FORMAT: u8 = 0b0110011;
        const R_FUNC: &[(u8, u8)] = &[
            (0b0000000, 0b000),
            (0b0100000, 0b000),
            (0b0000000, 0b001),
            (0b0000000, 0b010),
            (0b0000000, 0b011),
            (0b0000000, 0b100),
            (0b0000000, 0b101),
            (0b0100000, 0b101),
            (0b0000000, 0b110),
            (0b0000000, 0b111),
        ];

        let R_FUNC_MAP: HashMap<(u32, u32), ArithmeticInstruction> = HashMap::from([
            ((0b0000000, 0b000), ArithmeticInstruction::ADD),
            ((0b0100000, 0b000), ArithmeticInstruction::SUB),
            ((0b0000000, 0b001), ArithmeticInstruction::SLL),
            ((0b0000000, 0b010), ArithmeticInstruction::SLT),
            ((0b0000000, 0b011), ArithmeticInstruction::SLTU),
            ((0b0000000, 0b100), ArithmeticInstruction::XOR),
            ((0b0000000, 0b101), ArithmeticInstruction::SRL),
            ((0b0100000, 0b101), ArithmeticInstruction::SRA),
            ((0b0000000, 0b110), ArithmeticInstruction::OR),
            ((0b0000000, 0b111), ArithmeticInstruction::AND),
        ]);

        // IF ADD, EXECUTE AS SO
        let funct7 = (0b1111111 << 25) & instruction;
        let funct3 = (0b111 << 12) & instruction;

        // HASH GET
        let res = match R_FUNC_MAP.get(&(funct7, funct3)) {
            Some(val) => val,
            None => &ArithmeticInstruction::NONE,
        };

        // BAD FUNCTORS -> NOT A VALID R-TYPE INSTRUCTION
        if res == &ArithmeticInstruction::NONE {
            return false;
        }

        // GET SRC1, SRC2, DEST
        let src1 = (0x11111 << 15) & instruction;
        let src2 = (0x11111 << 20) & instruction;
        let dst = (0x11111 << 7) & instruction;

        // EXECUTE INSTRUCTION
        match res {
            &ArithmeticInstruction::ADD => {
                // add the src 1 and 2 registers to dst
                // NOTE: signed
                // ! MAY JUST HAVE TO USE Vec<[u8; 8], 32> and do it manually
                let _res = self.register_file[src1 as usize] as i64 + self.register_file[src2 as usize] as i64;
                self.register_file[dst as usize] = _res;
            }
            &ArithmeticInstruction::SUB => {
                let _res = self.register_file[src1 as usize] - self.register_file[src2 as usize];
                self.register_file[dst as usize] = _res;
            }
            &ArithmeticInstruction::SLL => {
                let _res = self.register_file[src1 as usize] << self.register_file[src2 as usize];
                self.register_file[dst as usize] = _res;
            }
            &ArithmeticInstruction::SLT => {
                // set true in dst when src1 < src2
                let _res = self.register_file[src1 as usize] < self.register_file[src2 as usize];
                if _res {
                    self.register_file[dst as usize] = 0b1;
                } else {
                    self.register_file[dst as usize] = 0b0;
                }
            }
            &ArithmeticInstruction::SLTU => {
                // set true on less than, unsigned comparison
            }
        }

        // 2. split into instruction keyword, src, dst

        // 3. execute instruction by updating reg/memory, etc

        return true;
    }
}

use object::*;
use std::collections::HashMap;
use std::error::Error;
use std::fs;
use std::hash::Hash;

// given file data (binary/byte), check if headers (magic number, executable, 64bit, little endian, riscv), program headers (right format, entries)
// code (no 32bit code in the text section is of the wrong format)
// other sections (section header for libraries), heap/.bss or something are in the right format and we can parse their labels and values and make space for those static variables
fn check_valid_elf64(file_path: &str) -> bool {
    // read file
    let bin_data = match fs::read(file_path) {
        Ok(file) => file,
        Err(err) => {
            println!("Failed to open file");
            return false;
        }
    };

    let obj_file = match File::parse(&*bin_data) {
        Ok(obj) => obj,
        Err(err) => {
            println!("Object not parseable");
            return false;
        }
    };

    if let Some(_file_type) = obj_file.section_by_name("magic number") {
        // println!("magic number = {}", _file_type);
    }

    // ensure elf
    // elf::CompressionHeader64;

    return true;
}

#[derive(Debug, PartialEq)]
enum ArithmeticInstruction {
    ADD = 0,
    SUB,
    SLL,
    SLT,
    SLTU,
    XOR,
    SRL,
    SRA,
    OR,
    AND,
    NONE,
}

#[test]
fn test_handler() {
    handle_operation(0x0);

    println!("ADD = {:?}", ArithmeticInstruction::ADD);
    println!("SUB = {:?}", ArithmeticInstruction::SUB);
    println!("AND = {:?}", ArithmeticInstruction::AND);
}
