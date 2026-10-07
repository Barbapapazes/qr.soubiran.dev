import type { SearchParams } from '../types/search-params'
import { useUrlSearchParams } from '@vueuse/core'

export const params = useUrlSearchParams<SearchParams>('history')
