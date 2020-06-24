export interface delegatesdata {
  id: string;
  delegate_name: string;
  online_status: string;
  shared_delegates_status: string;
  delegate_fee: string;
  block_verifier_total_rounds: string;
  block_verifier_online_percentage: string;
  total_vote_count: string;
  block_verifier_score: string;
}

export interface delegates_statisticsdata {
  id: string;
  block_height: string;
}

export interface delegates_voters_listdata {
  id: string;
  public_address_created_reserve_proof: string;
  total: string;
  reserve_proof: string;
}

export interface round_statisticsdata {
  id: string;
  next_block_verifiers: string;
}