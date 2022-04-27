import { _decorator, Component, Node } from "cc";
import * as cc from "cc";
const { ccclass, property } = _decorator;

@ccclass("head_head")
export class head_head extends Component {
	private _material: cc.renderer.MaterialInstance;
	start() {
		this._material = this.node.getComponent(cc.Sprite).material;
		this._material.setProperty("rounded_f", 0);
	}
	public slider_update(event_: cc.Slider): void {
		this._material.setProperty("rounded_f", event_.progress);
	}
}
