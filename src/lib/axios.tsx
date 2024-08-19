import axios from "axios"
import UserAgent from "user-agents"

export const getUserOnPlatform = async (
	url: string,
	domainUrl: string | null,
	userAgentToUse: string | null = null
) => {
	const userAgent = new UserAgent()

	if (domainUrl != null) {
		const domainResponse = await axios.get(domainUrl, {
			headers: {
				accept: "*/*",
				"User-Agent": userAgentToUse || userAgent.toString()
			}
		})
	}

	return axios.get(url, {
		headers: {
			accept: "*/*",
			"User-Agent": userAgentToUse || userAgent.toString()
		}
	})
}
