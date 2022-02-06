// to control devices, like output, serial, usb, ssd

// piston input for KB/Mouse event intercepting. Kind of like glfw which you can use to pass to the kernel through the kernel driver interrupt (not spectrovm driver)
struct Keyboard;
struct Mouse;

// can emulate these directly
struct UART;

// maybe a VHD or literally just a block of heap allocated memory on the host
// I like the heap allocated memory idea but only 32GB ram
// So I want to simulate an arbitarily big SSD (disk) so I will just use a binary file that can grow as much as it needs
// The problem is if you want to do stuff like write to arbitrary offsets. Then you may need to extend the file quite a lot, with empty space.
// so the idea is to just use a fixed size binary file of 50GB in /e/spectro_ssd.pcie4 (interfaces on pcie 4)
struct Disk;

// simulate PCIe behavior, parallel 16 lanes (wont be emulated). Wont be as fast but well it will be as fast as the host
struct PCIe;
// graphics library can render through X/wayland forwarding or something like how WSL2 does it
// you simply have a view of the screen and tell vulkan what to draw. But instead the graphics library sends out vulkan commands to the host to draw,
// within a VM graphics window
struct Monitor;
