import 'colors'

class Logger {
  constructor(private namespaces: string[] = []) {}
  create(...namespaces: string[]): LoggerService {
    return new Logger(this.namespaces.concat(namespaces))
  }
  getNamespacePart(): string {
    if (!this.namespaces.length) {
      return ''
    }
    return ('[' + this.namespaces.join(' -> ') + ']').magenta
  }
  getFullMessage(indicator: string, msg: unknown): string {
    return [indicator, this.getNamespacePart()].join('\t') + ' ' + msg
  }
  ready(msg: string, ...args: any[]): void {
    const indicator = 'READY'.green

    console.info(this.getFullMessage(indicator, msg), ...args)
  }
  error(msg: unknown, ...args: any[]): void {
    const indicator = 'ERROR'.red.bgWhite

    console.error(this.getFullMessage(indicator, msg), ...args)
  }
  warn(msg: string, ...args: any[]): void {
    const indicator = 'WARN'.yellow

    console.warn(this.getFullMessage(indicator, msg), ...args)
  }
  notImplemented(msg: string, ...args: any[]): void {
    const indicator = 'NOT IMPLEMENTED'.yellow

    console.warn(this.getFullMessage(indicator, msg), ...args)
  }
  success(msg: string, ...args: any[]): void {
    const indicator = '✓'.green

    console.info(this.getFullMessage(indicator, msg), ...args)
  }

  info(msg: string, ...args: any[]): void {
    const indicator = 'i'.blue
    console.info(this.getFullMessage(indicator, msg), ...args)
  }
  time(msg: string): () => void {
    console.time('TIME'.cyan + '\t' + this.getNamespacePart() + ' ' + msg)
    return this.timeEnd.bind(this, msg)
  }
  timeEnd(msg: string): void {
    console.timeEnd('TIME'.cyan + '\t' + this.getNamespacePart() + ' ' + msg)
  }
}

export class LoggerService extends Logger {
  create(...namespaces: string[]): Logger {
    return new Logger(namespaces)
  }
}
