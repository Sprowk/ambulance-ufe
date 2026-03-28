import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'cv3am-blood-bank-app',
  styleUrl: 'cv3am-blood-bank-app.css',
  shadow: true,
})
export class Cv3amBloodBankApp {

  @State() private relativePath = "";

  @Prop() basePath: string="";
  @Prop() apiBase: string;
  @Prop() bloodBankId: string;

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname)
  }

  render() {
    console.debug("cv3am-blood-bank-app.render() - path: %s", this.relativePath);
    let element = "list"
    let bagId = "@new"

    if ( this.relativePath.startsWith("bag/"))
    {
      element = "editor";
      bagId = this.relativePath.split("/")[1]
    }

    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }

    return (
      <Host>
        { element === "editor"
        ? <cv3am-blood-bank-editor bag-id={bagId}
            blood-bank-id={this.bloodBankId} api-base={this.apiBase}
            oneditor-closed={ () => navigate("./list")} >
          </cv3am-blood-bank-editor>
        : <cv3am-blood-bank-list  blood-bank-id={this.bloodBankId} api-base={this.apiBase}
            onbag-clicked={ (ev: CustomEvent<string>)=> navigate("./bag/" + ev.detail) } >
          </cv3am-blood-bank-list>
        }

      </Host>
    );
  }
}
