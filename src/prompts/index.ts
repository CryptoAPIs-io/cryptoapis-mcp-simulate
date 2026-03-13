import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { formatSupportedChains } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "../resources/supported-chains.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "dry-run-transaction",
        {
            description: "Simulate an EVM transaction before sending to check for errors",
            argsSchema: {
                blockchain: z.string().describe("EVM blockchain to simulate on (e.g. ethereum, polygon)"),
                network: z.string().describe("Network to simulate on (e.g. mainnet, sepolia)"),
                fromAddress: z.string().describe("Sender address"),
                toAddress: z.string().describe("Recipient or contract address"),
                value: z.string().optional().describe("Value in wei to send"),
            },
        },
        (args): GetPromptResult => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Use simulate_evm to dry-run a transaction on ${args.blockchain}/${args.network} from ${args.fromAddress} to ${args.toAddress} with value ${args.value ?? "0"}. This simulates the transaction without broadcasting, returning estimated gas usage, success/failure status, and any revert reasons. Use this to validate transactions before signing and broadcasting — it helps catch errors and estimate costs.\n\n${formatSupportedChains(supportedChains)}`,
                    },
                },
            ],
        }),
    );
}
