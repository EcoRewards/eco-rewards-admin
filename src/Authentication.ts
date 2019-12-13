import { useCookies } from "react-cookie";
import Axios, { AxiosInstance } from "axios";

export class Authentication {
  private readonly cookie: AuthenticationCookie;
  private readonly setCookie: (name: string, value: any) => void;
  private readonly removeCookie: (name: string) => void;
  private readonly authenticatedApi: AxiosInstance;

  constructor(
    private readonly api: AxiosInstance
  ) {
    const [cookie, setCookie, removeCookie] = useCookies(["auth"]);

    this.cookie = cookie.auth;
    this.setCookie = setCookie;
    this.removeCookie = removeCookie;
    this.authenticatedApi = Axios.create({
      baseURL: api.defaults.baseURL,
      headers: {
        authorization: "Basic " + (this.cookie && this.cookie.token)
      }
    });
  }

  public get isAuthenticated(): boolean {
    return this.cookie && this.cookie.token !== undefined;
  }

  public async login(username: string, password: string): Promise<void> {
    try {
      const response = await this.api.post("/login", { username, password });

      this.setCookie("auth", response.data.data);
    }
    catch (e) {
      console.error(e);
    }
  }

  public logout(): void {
    this.removeCookie("auth");
  }

  public getAuthenticatedApi() {
    return this.authenticatedApi;
  }

  public getName() {
    return this.cookie.name;
  }
}

interface AuthenticationCookie {
  token?: string
  name?: string
}
