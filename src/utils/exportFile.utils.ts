import exportFromJson from 'export-from-json'

type ExportFileProps = {
  fileName: string
  exportType: 'txt' | 'json' | 'csv'
  data: object[]
}

export function exportFile ( { data, fileName = String( new Date ), exportType = 'json' }: ExportFileProps ) {
  exportFromJson( { data, fileName, exportType } )
}