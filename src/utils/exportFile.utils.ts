import exportFromJson from 'export-from-json'

export type ExportFileType = 'json' | 'csv' | 'txt'

type ExportFileProps = {
  fileName: string
  exportType: ExportFileType
  data: object[]
}

export function exportFile ( { data, fileName = String( new Date ), exportType = 'json' }: ExportFileProps ) {
  exportFromJson( { data, fileName, exportType } )
}