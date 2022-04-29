import { _decorator, Component, Node } from "cc";
import * as cc from "cc";
const { ccclass, property } = _decorator;

@ccclass("scratch_card_scratch_card")
export class scratch_card_scratch_card extends Component {
	private _material: cc.renderer.MaterialInstance;
	private _touch_pos_v4s_handle: any;

	private _touch_pos_v4s: cc.Vec4[] = [cc.v4()];
	/** 坐标列表长度 */
	private _list_length_n = 0;

	private _trans_comp: cc.UITransform;

	private _touch_pos_v2 = cc.v2();
	private _touch_pos_v3 = cc.v3();
	onLoad() {
		this._trans_comp = this.node.getComponent(cc.UITransform);
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touch_move, this);
	}
	start() {
		this._material = this.node.getComponent(cc.Sprite).material;
		// 半径
		this._material.setProperty("radius_f", 0.2);
		// 获取句柄
		this._touch_pos_v4s_handle = this._material.passes[0].getHandle("touch_pos_v4s");
	}
	update() {
		if (!this._touch_pos_v4s.length) {
			return;
		}
		this._material.passes[0].setUniformArray(this._touch_pos_v4s_handle, this._touch_pos_v4s);
	}
	private _touch_move(event_: cc.EventTouch): void {
		// 转换到节点坐标系
		event_.getLocation(this._touch_pos_v2);
		this._touch_pos_v3.x = this._touch_pos_v2.x;
		this._touch_pos_v3.y = this._touch_pos_v2.y;
		this._trans_comp.convertToNodeSpaceAR(this._touch_pos_v3, this._touch_pos_v3);
		// 转换到 -1 ~ 1
		this._touch_pos_v3.divide3f(this._trans_comp.width * 0.5, this._trans_comp.height * 0.5, 1);
		// uv y坐标是从上到下为递增，所以需要转换
		this._touch_pos_v3.y *= this._touch_pos_v3.y > 1 ? 1 : -1;
		// 加入触点列表
		let index_n = Math.floor(this._list_length_n / 2);
		++this._list_length_n;
		if (this._list_length_n & 1) {
			this._touch_pos_v4s[index_n].x = this._touch_pos_v3.x;
			this._touch_pos_v4s[index_n].y = this._touch_pos_v3.y;
			this._touch_pos_v4s[index_n].z = -999.0;
		} else {
			this._touch_pos_v4s[index_n].z = this._touch_pos_v3.x;
			this._touch_pos_v4s[index_n].w = this._touch_pos_v3.y;
			this._touch_pos_v4s[index_n + 1] = cc.v4(-999.0);
		}
		if (this._touch_pos_v4s.length > 128) {
			this._touch_pos_v4s.shift();
			this._list_length_n -= 2;
		}
		cc.log(this._touch_pos_v4s);

		// cc.RenderTexture.prototype.readPixels()
	}
}
