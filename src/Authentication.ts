import Axios, { AxiosInstance } from "axios";
import Cookies from "universal-cookie";

export class Authentication {
  private readonly authenticatedApi: AxiosInstance;

  constructor(
    private readonly api: AxiosInstance,
    private readonly cookies: Cookies
  ) {

    this.authenticatedApi = Axios.create({
      baseURL: api.defaults.baseURL,
      headers: {
        authorization: "Basic " + this.cookies.get("auth")?.token
      }
    });
  }

  public get isAuthenticated(): boolean {
    return this.cookies.get("auth") && this.cookies.get("auth").token !== undefined;
  }

  public async login(username: string, password: string): Promise<void> {
    try {
      const response = await this.api.post("/login", { username, password });
      this.cookies.set("auth", response.data.data, { sameSite: "strict" });
    }
    catch (e) {
      console.error(e);
    }
  }

  public logout(): void {
    this.cookies.remove("auth");
  }

  public getAuthenticatedApi() {
    return this.authenticatedApi;
  }

  public getName() {
    return this.cookies.get("name");
  }
}
