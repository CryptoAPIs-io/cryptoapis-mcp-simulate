import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { SimulateEvmToolSchema, type SimulateEvmToolInput } from "./schema.js";
import { simulateTransaction } from "../../api/evm/simulate-transaction/index.js";
import { credits as simulateCredits } from "./credits.js";

export const simulateEvmTool: McpToolDef<typeof SimulateEvmToolSchema> = {
    name: "simulate_evm",
    description: `Dry-run an EVM transaction without broadcasting it to the network. Returns estimated gas usage, execution success/failure, and any revert reason. Use this to validate transactions before signing and broadcasting — helpful for catching errors, estimating costs, and debugging contract interactions.`,
    credits: simulateCredits,
    inputSchema: SimulateEvmToolSchema,
    handler: (client: CryptoApisHttpClient) => async (input: SimulateEvmToolInput) => {
        const result: RequestResult<unknown> = await simulateTransaction(client, {
            blockchain: input.blockchain,
            network: input.network,
            fromAddress: input.fromAddress,
            toAddress: input.toAddress,
            value: input.value,
            data: input.data,
            gasLimit: input.gasLimit,
            gasPrice: input.gasPrice,
            context: input.context,
        });
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        ...(result.data as object),
                        creditsConsumed: result.creditsConsumed,
                        creditsAvailable: result.creditsAvailable,
                        responseTime: result.responseTime,
                        throughputUsage: result.throughputUsage,
                    }),
                },
            ],
        };
    },
};
