import { _decorator, Component, Node } from "cc";
import * as cc from "cc";
const { ccclass, property } = _decorator;

@ccclass("scene_head")
export class scene_head extends Component {
	public button_close(): void {
		cc.director.loadScene("main");
	}
}
