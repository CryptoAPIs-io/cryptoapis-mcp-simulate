import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

// Simulate Ethereum Transactions (OpenAPI) is Ethereum-only — the endpoint path is
// literally /simulate-transactions/evm/ethereum/{network}, not a {blockchain}
// template. Do not add a blockchain field here: the API layer hardcodes "ethereum"
// in the URL, so a blockchain param would silently be ignored (BL-0197).
export const EvmNetwork = z.enum(["mainnet", "sepolia"]);

export const SimulateEvmToolSchema = z
    .object({
        network: EvmNetwork.describe("Network name (Ethereum only — mainnet or sepolia)"),
        fromAddress: z.string().min(1).describe("Sender address"),
        toAddress: z.string().optional().describe("Recipient or contract address (omit for contract deployment simulation)"),
        value: z.string().optional().describe("Amount in native coin's smallest unit, e.g. wei (defaults to '0')"),
        data: z.string().optional().describe("Hex-encoded calldata for contract interaction or deployment bytecode"),
        gasLimit: z.string().optional().describe("Custom gas limit override (auto-estimated if omitted)"),
        gasPrice: z.string().optional().describe("Custom gas price in wei (auto-estimated if omitted)"),
    })
    .merge(RequestMetadataSchema);

export type SimulateEvmToolInput = z.infer<typeof SimulateEvmToolSchema>;
