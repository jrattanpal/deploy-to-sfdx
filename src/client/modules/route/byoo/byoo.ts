import { LightningElement, api, track } from 'lwc';
<<<<<<< HEAD
=======
import { multiTemplateURLBuilder } from '../../../../server/lib/multiTemplateURLBuilder';
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac

export default class Byoo extends LightningElement {
  @api template;

  @track sandboxURL;
  @track regularURL;

  get scratchUrl() {
    return window.location.href.replace('byoo', 'launch');
  }
  async connectedCallback() {
<<<<<<< HEAD
    const authURL = `/authURL?template=${this.template}`;
=======
    const authURL = multiTemplateURLBuilder(this.template, '/authURL');
    console.log(authURL);
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    this.regularURL = await (await fetch(authURL)).text();
    this.sandboxURL = await (await fetch(`${authURL}&base_url=https://test.salesforce.com`)).text();
  }
}
