import { _decorator, Component, Node } from "cc";
import * as cc from "cc";
const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
	public button_head(): void {
		cc.resources.loadScene("head");
	}
	public button_sdf_texture(): void {
		cc.resources.loadScene("sdf_texture");
	}
}
