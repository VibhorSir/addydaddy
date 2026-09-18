declare module "gray-matter" {
  interface GrayMatterResult {
    data: Record<string, unknown>;
    content: string;
  }

  function matter(
    input: string,
    options?: Record<string, unknown>
  ): GrayMatterResult;

  export default matter;
}
