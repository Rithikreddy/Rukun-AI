import logging

import click
import uvicorn


@click.command()
@click.option("--dev", is_flag=True, help="Enable auto-reload")
@click.option("--host", default="0.0.0.0", help="Host to bind")
@click.option("--port", default=8000, type=int, help="Port to bind")
def cli(dev: bool, host: str, port: int):
    logging.info(f"Starting API on {host}:{port}")
    uvicorn.run("api.server:app", host=host, port=port, reload=dev)


if __name__ == "__main__":
    cli()
