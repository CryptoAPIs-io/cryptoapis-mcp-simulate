import type { SupportedChainsResource } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains, networks, and actions for the simulate package.
 *
 * Ethereum-only (BL-0197): the underlying OpenAPI endpoint's path is literally
 * /simulate-transactions/evm/ethereum/{network}, not a {blockchain} template.
 */
export const supportedChains: SupportedChainsResource = {
    evm: {
        blockchains: ["ethereum"],
        networks: {
            ethereum: ["mainnet", "sepolia"],
        },
        actions: {
            "simulate-transaction": ["ethereum"],
        },
    },
};
