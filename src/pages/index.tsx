import { sendRequest } from "@/utils/axios/sendRequest";
import { Container } from "@/components/atoms/Container";

export default function Home({ res }) {
	const fetchData = async () => {
		const result = await sendRequest();
		console.log(result);
	};
	return (
		<main className="flex flex-col items-center justify-center h-[100vh] w-full">
			<button className="bg-amber-200 w-40 h-20 rounded" onClick={fetchData}>
				Fetch Data!
			</button>
			<h2>Res body : {res.body}</h2>
			<Container size="lg" className="bg-red-400">
				<p>Check</p>
			</Container>
		</main>
	);
}

export async function getStaticProps() {
	const res = await sendRequest({ url: "/posts/1" });
	return {
		props: {
			res
		}
	};
}
