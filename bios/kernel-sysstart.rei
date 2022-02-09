# right after _entry, load the key modules like filesystem to find specific things
# the filesystem of the kernel partition itself should already be hardcoded into the compiled binary
# actually no cause we want it to be able to grow and shrink
# quantii_files -> filesystems that arcboot detect as being 'part' of quantii. Usually only 1 is needed
# load complex drivers

main(arcpaging, arcdrivers) = {
    # setup complex virtual memory management
    setup_page_tables(arcpaging)

    # setup kernel MMIO syscall API, arcboot loads the kernel, kernel loads the MMIO syscall binary/dynamic link library into RAM
    # basically kernel shell services
    load_mmsyscall()

    # source drivers from arcboot
    source_drivers(&arcdrivers)
    # load complex driver management for arcdrivers (global stuff)
    let driver_manager = load_driver_manager()

    # load process manager to create and manage process containers for multiple running programs
    # must call load_process_manager() to be able to call load_service()
    # also loads IPC mechanisms
    # kind of like load_service(Service::ProcessManager)
    load_process_manager()

    # load some key services like runner and reis interpreter
    let reis_interpreter_pid = load_service(Service::ReisInterpreterService)
    let elf_runner_pid = load_service(Service::ElfRunnerService)

    # load key filesystems that store kernel stuff, e.g. kernel0 partition 3 that takes the rest of the drive
    # part0 contains arcboot img, part1 contains the kernel img itself
    # go through each partition to check for filesystems that match the kernel handle id. I.e. that partition 'belongs' to the kernel
    # if a partition belongs to a kernel, search through that for startup scripts
    let fs_manager = load_service(Service::FilesystemManager)
    let startup_scripts = fs_manager.find_startup_scripts()

    # startup_scripts -> { script_path: String, should_be_run: bool } run() {execute_script(script_path)}
    # filter scripts in place
    startup_scripts.filter(s => s.should_be_run, in_place=true)

    # run startup scripts
    startup_scripts.map(s => s.run())

    let startup_binaries = fs_manager.find_startup_binaries()
    startup_binaries.map(s => s.run())

    # load the rest of the services into memory and initialise them in a separate thread until they are all ready and `.join()` for all threads

    # Ensure graphics driver is loaded and working, otherwise panic
    ensure_functional(Driver::graphics, panic=true)
    load_service(Service::ArcWM)
    load_service(Service::Network)
    load_service(Service::SyscallABI)
    
    # shell -> interface between userspace and kernel. Can be hooked/interacted with by a terminal program, e.g. arcterm
    load_service(Service::Shell)

    # Load any extension modules
    let k_exts = fs_manager.find_extension_modules()
    k_exts.map(k => k.load())

    # though arcboot has its own commandline (maybe), kernel should have its own commandline too, either based on arcboot or a unique one
    # do higher level stuff with the system_shell
    let system_shell = load_cli()

    # services are technically processes, they dont have to be but I made them so
    # services have a pid and a special flag `service = true`

    # done with core kernel stuff, can load userspace utilities and config
    # kernel code should now be loaded into RAM with syscall ABI and managers ready to accept requests and handle them
    # when an app needs them
    load_userspace()
}

execute_script(script_path) = {
    # use the filesystem manager to load the script into RAM
    let file_handle = fs_manager.load_file(script_path)
    # interpret the script (the interpreter service must be running!)
    interpreter.run_file(file_handle)
}

# execute a binary file, load into RAM and run with the runner
execute_bin(binary_path) = {
    # should be a contiguous block of virtual memory, viewed by the kernel
    let file_handle = fs_manager.load_file(binary_path)
    # run the binary (elf64 riscv)
    elf_run_file(file_handle)
}
