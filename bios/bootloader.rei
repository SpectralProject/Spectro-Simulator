# no_std
package arcboot

# A 2nd stage bootloader that runs after the 1st stage in the UEFI BIOS firmware
# the firmware detects the presence of an .ELF system partition containing an arcboot img
# this is the entry of the img
main() = {
    # load bootstage drivers configured by the kernel to load in boot time
    # if possible, load graphics drivers as soon as possible and allow the bootloader to render via those drivers
    for driver in drivers_to_load {
        driver.load()
    }

    # detect the presence of all kernel headers by inspecting each partition for each drive
    # if a kernel is multiboot compliant, add that to the list
    for partition in partitions {
        if partition.multiboot == true {
            _bootable_kernels.add(&partition)
        }
    }

    # display the bootable kernels
    let chosen_kernel = _bootable_kernels.display()

    # load the chosen kernel at 130KB
    bare_metal::load_into_ram(chosen_kernel.img, 0x40000)

    # start executing the kernel at _start
    # execute() creates a full context switch from bootloader to kernel
    bare_metal::execute(0x40000)
}

# in _bootable_kernels
display() = {
    # need a primitive display driver. For spectro hardware, maybe can build some of it into the bios and bootloader itself
    # or load it as we are starting, then use normal vulkan calls/Arcgraphics to load complex visuals

    # mostly 2D graphics, can technically hardcode

    let chosen_kernel: Kernel

    for kernel in self.kernels {
        # setup region
        region = get_next_drawable_region()
        region.draw(kernel.visual)
    }

    # automatically choose the default (first detected kernel) after 10s
    thread.sleep(10.0s)
    if !chosen_kernel {
        chosen_kernel = kernels.first()
    }

    # onClick, load that kernel into RAM and display loading animation
    on_click(kernel) = {
        return kernel
    }

    return chosen_kernel
}
