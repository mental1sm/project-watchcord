import { ApiProperty } from '@nestjs/swagger';

/**
 * Fetching options
 * limit - message count
 * after - fetch after message with specified id
 * before - fetch before message with specified id
 * around - fetch before and after message with specified id
 */
export class MessageFetchingOptions {
  @ApiProperty({ description: 'Number of fetched messages', required: false })
  limit?: number;
  @ApiProperty({
    description: 'Fetch messages after the message with specified id',
    required: false,
  })
  after?: string;
  @ApiProperty({
    description: 'Fetch messages before the message with specified id',
    required: false,
  })
  before?: string;
  @ApiProperty({
    description: 'Fetch messages around the message with specified id',
    required: false,
  })
  around?: string;
}
