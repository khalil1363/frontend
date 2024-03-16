import { Component } from '@angular/core';
import { Contract } from '../models/Contract';
import { ContractService } from '../services/contractService';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent {
  contract: Contract = {
    detailsContractuels: '',
    termesFinanciers: '',
    clausesSpecifiques: '',
    objectifs: ['Objective 1', 'Objective 2'], // Example values for objectifs
    date: new Date().toISOString(), // Initialize with current date in ISO format
    player: { leagalefullname: '' } // Populate player with leagalefullname
  };
  
  constructor(private contractService: ContractService) {}

  addContract(): void {
    this.contractService.createContract(this.contract).subscribe({
      next: (contract) => console.log('Contract added:', contract),
      error: (error) => console.error('Error adding contract:', error)
    });
  }
}
