import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payee } from './entities/payee.entity';
import { NetBanking } from 'src/netbanking/entity/netbanking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PayeeService {

    constructor(
        @InjectRepository(Payee)
        private readonly payeeRepo: Repository<Payee>,
    
        @InjectRepository(NetBanking)
        private readonly netBankingRepo: Repository<NetBanking>,
      ) {}
}
