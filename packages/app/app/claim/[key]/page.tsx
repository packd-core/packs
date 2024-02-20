import ClaimForm from "@/app/claim/[key]/ClaimForm";
import {fetchFullPackDetail} from "@/src/lib/fetchFullPackDetail";

export default async function ClaimPage({ params: { key } }: any) {
  const data = await fetchFullPackDetail({key})
  return <ClaimForm claimKey={key} tokenData={data} />;
}
