import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type SimulateTransactionInput = {
    blockchain: string;
    network: string;
    fromAddress: string;
    toAddress?: string;
    value?: string;
    data?: string;
    gasLimit?: string;
    gasPrice?: string;
} & RequestMetadata;

export async function simulateTransaction(
    client: CryptoApisHttpClient,
    input: SimulateTransactionInput
) {
    return client.request<unknown>(
        "POST",
        `/simulate-transactions/evm/ethereum/${input.network}`,
        {
            query: { context: input.context },
            body: {
                data: {
                    item: {
                        sender: input.fromAddress,
                        recipient: input.toAddress ?? "",
                        amount: input.value ?? "0",
                        gasLimit: input.gasLimit != null ? parseInt(input.gasLimit, 10) : 84000,
                        ...(input.data != null && { inputData: input.data }),
                        ...(input.gasPrice != null && { gasPrice: input.gasPrice }),
                    },
                },
            },
        }
    );
}
