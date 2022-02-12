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

use object::*;
use std::error::Error;
use std::fs;

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
        Err(err) =>  {
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

// given instruction, update registers and memory (technically cache but for now just update RAM each time
fn handle_operation(instruction: u32) {
    // instruction: 4 types
    // opcode: 8bits
    // src, dst, immediate: variable

    // 1. check instruction format based on opcode

    // 2. split into instruction keyword, src, dst

    // 3. execute instruction by updating reg/memory, etc
}

#[test]
fn test_handler() {
    handle_operation(0x0);
}
