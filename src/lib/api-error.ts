export class ApiError extends Error {
  constructor(
    public code: string,
    public status: number,
    message?: string
  ) {
    super(message || code)
    this.name = 'ApiError'
  }
}

export const ApiErrors = {
  invalidDate: () => new ApiError('INVALID_DATE', 400, 'Date must be in YYYY-MM-DD format'),
  pastDate: () => new ApiError('PAST_DATE', 400, 'Date must be today or in the future'),
  invalidGuests: () => new ApiError('INVALID_GUESTS', 400, 'Guests must be between 1 and 20'),
  invalidTime: () => new ApiError('INVALID_TIME', 400, 'Invalid time format or not in available slots'),
  slotUnavailable: () => new ApiError('SLOT_UNAVAILABLE', 400, 'This time slot is no longer available'),
  closed: () => new ApiError('CLOSED', 400, 'Restaurant is closed on this date'),
  notFound: () => new ApiError('NOT_FOUND', 404, 'Reservation not found'),
  internal: () => new ApiError('INTERNAL_ERROR', 500, 'Something went wrong'),
}
