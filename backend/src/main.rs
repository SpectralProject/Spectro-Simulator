use regex::Regex;
use std::env;
use std::io::{self, Write};

// CLI for spectro VM
// Otherwise target the library instead and use the functions for a frontend app
fn main() {
    println!("=================\nWITHIN SPECTRO VM\n=================");

    let _args: Vec<String> = env::args().collect();

    // check if --bin exists and the arg that follows it
    let elf_file = if let index = _args.iter().position(|r| r == "--bin").unwrap() {
        // get index + 1
        let _res = &_args[index + 1];
        // check if there is a string that matches *.elf
        if !_res.contains(".elf") {
            std::process::exit(1);
        }
        // otherwise return the result
        _res
    } else {
        // shouldnt happen
        ""
    };

    // start the view server on another thread

    // attempt to execute the elf file on another thread

    // user interface
    loop {
        print!("> ");
        io::stdout().flush().unwrap();

        process_input();
    }
}

fn process_input() {
    let mut buffer = String::new();
    std::io::stdin().read_line(&mut buffer);
    let res = buffer.trim();

    if res == "exit" {
        println!("exiting...");
        std::process::exit(0);
    }
}

#[derive(Debug, Clone, Copy)]
struct BootableImg {}

// A disk or storage media
#[derive(Debug, Clone, Copy)]
struct Disk {
    uefi_bootable: bool,
    bootable_img: BootableImg,
}

impl Disk {
    pub fn new() -> Self {
        Self {
            uefi_bootable: true,
            bootable_img: BootableImg {},
        }
    }
}

// Run the bootloader and kernel
fn run_img() {
    // simulate bootloader behavior

    // check disk partition
}

fn bios_options() {
    let disks = vec![Disk::new(); 4];

    let mut img_boot: BootableImg = BootableImg {};
    let mut _boot_flag = false;

    // check if disk is bootable
    for disk in disks {
        if disk.uefi_bootable {
            // load the bootloader + kernel img from it
            img_boot = disk.bootable_img;
            _boot_flag = true;
            break;
        }
    }

    if !_boot_flag {
        // go into UEFI menu
    } else {
        // secure boot, dont allow cetain things to be done like manipulating devices too much
        // limited manipulation and controlled
        fn secure_boot(boot_img: BootableImg) {
            // TODO: secure boot logic

            // start executing the boot_img code
        }

        secure_boot(img_boot);

        //
    }
}
