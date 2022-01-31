// MODULES
pub(crate) mod soc;
pub(crate) mod cpu;
pub(crate) mod dsp;
pub(crate) mod gpu;
pub(crate) mod nic;
pub(crate) mod ram;
pub(crate) mod crypto;

#[test]
fn test_basics() {
    // create an SoC
    let soc = soc::Soc::new();

}