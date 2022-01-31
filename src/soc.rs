use crate::cpu::CPUCluster;
use crate::crypto::CryptoModule;
use crate::dsp::DSPCore;
use crate::gpu::GPUChip;
use crate::nic::NetworkChip;
use crate::ram::SDRAMChip;

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
