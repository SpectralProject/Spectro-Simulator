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

fn bios_options() {
    // secure boot
    
    // load 
}
