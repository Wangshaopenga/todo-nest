import { SetMetadata } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export function SkipJwtAuth() {
  const config = new ConfigService()
  return SetMetadata(config.get('IS_PUBLIC_KEY'), true)
}
