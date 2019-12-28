/**
 *
 * @author 
 *
 */
interface IUpdateable {
    update(delta: number): void;
    deleted: boolean;
}
