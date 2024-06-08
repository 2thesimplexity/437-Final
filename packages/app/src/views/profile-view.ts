import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Profile } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import { ProfileEditor } from "../components/profile-editor";

@customElement('profile-view')
class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-editor": ProfileEditor
  });

  @property({ type: String }) userid = '';

  @property()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("blazing:model");
  }

  render() {
    return this.edit
      ? html`
          <profile-editor
            .userid=${this.userid}
            .init=${this.profile}
          ></profile-editor>
        `
      : html`<p>Profile view for ${this.userid}</p>`; // non-editing view
  }
}
