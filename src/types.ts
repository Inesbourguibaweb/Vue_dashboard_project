export interface Collaborateur {
  id: number
  nom: string
  email: string
  role: string
}

export interface Transaction {
  id: number
  date: string
  montant: number
  payee: boolean
}

export interface Summary {
  total: number
  totalPayee: number
  totalNonPayee: number
}

export interface Client {
  id: number
  nom: string
  email: string
}

export interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}
