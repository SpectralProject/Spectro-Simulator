# the bios firmware

# like a normal program but mostly bare metal instructions for the cpu

# Spectral Soc Device Interface BIOS
# graphics = 0x0
# mouse = 0x1
# keyboard = 0x2
# pcie A = 0x3
# pcie B = 0x4
# usb C (4x) = 0x5 - 0x8
# ethernet = 0x9
# wifi bt = 0xA
# audio out = 0xB
# audio in = 0xC
# gpio = 0xD

# entry point script
# motherboard controller or an actual program loaded into RAM and executed by CPU
# assume latter
.global
# if 0x0, then there is a problem. Should be 1..n 
boot_disk = 0x0
partition_efi = 0x0

_entry:
    # initialise devices
    # loaddev -> basically tells CPU to start the device unless some controller within motherboard already does it
    loaddev 0x0
    ...
    loaddev 0xD

    # check settings, boot, etc
    call manage_settings

    # load bootloader from configured disk boot and partition efi and hand off execution to it
    call load_bootloader

    # when shutdown, kernel should return to the bootloader, which then returns here
    call shutdown

load_bootloader:
    # given an EFI file, execute the program to load the configured bootloader for that efi system

manage_settings:
    # stuff

    # check drives/storage for bootable EFI partitions
    # branch_on_equal -> beq
    # for drive in drives
    #     if drive contains efi partition
    #         global.boot_disk = drive.number
    #         break (j end)
    # end

    # in drive i
    # if first 32 bits is a protective MBR or hybrid MBR, set mbr_flag = true for this disk
    # if next 32 bits is a primary GPT header, set gpt_flag = true, else skip to i+1
    # for j = 2..33
    #   if entry j defines an EFI partition, set disk_boot = i and partition_efi = j
    #       break
    
    # 

shutdown:
    # tell CPU to tell devices to shutdown if they havent already done so
    closedev 0x0
    ...
    closedev 0xD
