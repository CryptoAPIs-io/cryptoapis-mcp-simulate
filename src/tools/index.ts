import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { simulateEvmTool } from "./evm/index.js";

export const tools = [simulateEvmTool, systemInfoTool] as const;
