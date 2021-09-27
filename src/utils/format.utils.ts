export function formatCash ( cash: number ): string {
  return String( new Intl.NumberFormat( 'pt-BR', { style: 'currency', currency: 'BRL' } ).format( Number( cash ) ) )
}

export function formatDate ( date: string ): string {
  return new Date( date ).toLocaleDateString( 'eng-US', { day: '2-digit', month: 'short', } )
}

export function getMonth ( date: string ): string {
  return new Date( date ).toLocaleDateString( 'eng-US', { month: 'long' } )
}