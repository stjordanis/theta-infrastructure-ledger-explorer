import { apiService } from './api';

export const stakeService = {
  getAllStake() {
    return apiService.get(`stake/all`, {});
  },
  getStakeByAddress(address) {
    if (!address) {
      throw Error('Missing argument');
    }
    return apiService.get(`stake/${address}`, {});
  }
};
