import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const EvmBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "tron",
    "polygon",
    "avalanche",
    "arbitrum",
    "base",
    "optimism",
]);
export const EvmNetwork = z.enum(["mainnet", "mordor", "testnet", "nile", "sepolia", "amoy", "fuji"]);

export const SimulateEvmToolSchema = z
    .object({
        blockchain: EvmBlockchain.describe("Blockchain protocol"),
        network: EvmNetwork.describe("Network name"),
        fromAddress: z.string().min(1).describe("Sender address"),
        toAddress: z.string().optional().describe("Recipient or contract address (omit for contract deployment simulation)"),
        value: z.string().optional().describe("Amount in native coin's smallest unit, e.g. wei (defaults to '0')"),
        data: z.string().optional().describe("Hex-encoded calldata for contract interaction or deployment bytecode"),
        gasLimit: z.string().optional().describe("Custom gas limit override (auto-estimated if omitted)"),
        gasPrice: z.string().optional().describe("Custom gas price in wei (auto-estimated if omitted)"),
    })
    .merge(RequestMetadataSchema);

export type SimulateEvmToolInput = z.infer<typeof SimulateEvmToolSchema>;
