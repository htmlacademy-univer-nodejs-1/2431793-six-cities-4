import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.underline('Программа для подготовки данных для REST API сервера.')}
        Пример:
            ${chalk.bgCyan('cli.ts --<command> [arguments]')}
        Команды:
            ${chalk.cyan('--version:')}                    # выводит информации о версии приложения.
            ${chalk.cyan('--help:')}                       # выводит информацию о списке поддерживаемых команд.
            ${chalk.cyan('--import <path>:')}              # импортирует данные из *.tsv-файла.
            ${chalk.cyan('--generate <n> <path> <url>:')}  # генерирует произвольное количество тестовых данных
    `);
  }

  public getName(): string {
    return '--help';
  }
}
