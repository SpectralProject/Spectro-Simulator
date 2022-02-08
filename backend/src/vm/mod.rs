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
