use std::io::{self, Write};

fn main() {
    println!("=================\nWITHIN SPECTRO VM\n=================");

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

// stuff to output to console
