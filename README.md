# Spectro-Simulator
Simulator for my Spectro SoC.

## Spectral
Frontend for spectro. Built as a web app.
- I havent decided if I want to link the frontend to a compiled wasm which seems like a great idea for performance and seems to work well. But then I would have to recompile and link every time, so maybe I'll leave that idea to later.
- I think I'll just connect to the backend via REST or RPC. Does seem like it can get pretty laggy but for simpler things should be mostly fine. Then one can compile the backend as a library instead of a server executable and link it directly.

## SpectroVM
Kind of like QEMU but instead you simulate only spectro hardware. Im not interested in other stuff, esp x86. If you want arm just use QEMU or a pi3/4.

Works as a terminal based VM which you can interface with directly by running `spectrovm`. Or run as `spectrovm <riscv_program.elf>`. Which loads the `.elf` file and runs it sequentially.
