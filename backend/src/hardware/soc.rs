use super::cpu::CPUCluster;
use super::crypto::CryptoModule;
use super::dsp::DSPCore;
use super::gpu::GPUChip;
use super::nic::NetworkChip;
use super::ram::SDRAMChip;

pub struct Soc {
    core_cluster: CPUCluster,
    dsp: DSPCore,
    ram: SDRAMChip,
    nic: NetworkChip,
    gpu: GPUChip,
    crypto: CryptoModule,
}

impl Soc {
    pub fn new() -> Soc {
        Soc {
            core_cluster: CPUCluster {},
            dsp: DSPCore {},
            ram: SDRAMChip {},
            nic: NetworkChip {},
            gpu: GPUChip {},
            crypto: CryptoModule {},
        }
    }
}

// TESTS

#[test]
fn test_basics() {
    // create an SoC
    let soc = Soc::new();
}
