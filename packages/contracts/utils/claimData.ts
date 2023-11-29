export interface ClaimData {
  tokenId: number;
  sigOwner: string; // Signature from the Pack owner
  claimer: string; // Address of the claimer
  sigClaimer: string; // Signature from the claimer
  refundValue: bigint; // Value to refund to the relayer
  maxRefundValue: bigint; // Maximum refundable value (to prevent over-refund)
  moduleData: Array<any>; // Data for the module
}
