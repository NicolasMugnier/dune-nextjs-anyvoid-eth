import { DuneClient, ResultsResponse } from "@duneanalytics/client-sdk";
import Image from "next/image";
import { ReactElement } from "react";

export default async function Home(): Promise<ReactElement<any, any>> {
  const dune: DuneClient = new DuneClient(process.env.DUNE_API_KEY || '');
  const query_result: ResultsResponse = await dune.getLatestResult({queryId: 4753879});

  interface Row {
    _dune_source_file: string;
    _dune_updated_at: any;
    created_at: any;
    deleted_at: any;
    fid: number;
    hash: string;
    id: number;
    timestamp: number;
    type: string;
    updated_at: any;
    value: string;  
  }

  return (
    <div className="content">
    {query_result.result?.rows.map((row: Record<string, any>): ReactElement|undefined => {
        if (row['type'] === 6) {
          return <h1>{row['value'] as string}</h1>
        }
        if (row['type'] === 1) {
          return <Image 
                    aria-hidden
                    src={row['value'] as string}
                    alt="Image"
                    width={500}
                    height={500}
                  />
        }
        if (row['type'] === 3) {
          return <p>{row['value'] as string}</p>
        }
    })}
    </div>
  )
}
