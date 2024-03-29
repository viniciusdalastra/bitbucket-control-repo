import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class GetDefaultRepositoriesUseCase {
  async execute() {
    try {
      const conteudoArquivo = fs.readFileSync(
        'src/shared/files/repo.json',
        'utf8',
      );
      return JSON.parse(conteudoArquivo);
    } catch (error) {
      throw new Error(`Error on load JSON: ${error.message}`);
    }
  }
}
