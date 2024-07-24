from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DATABASE_URL = "postgresql://<user>:<password>@/<database>?host=/cloudsql/<instance_connection_name>"
DATABASE_URL = "postgresql://crying-babies:wehhwehhwehh@/crying-babies-db?host=/cloudsql/video-upload-429504:asia-southeast1:crybabydatabase-sql"


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    file_path = Column(String)
    duration = Column(Integer)
    user_id = Column(Integer)
    recorded_at = Column(DateTime)
    is_critical = Column(Boolean, default=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

Base.metadata.create_all(bind=engine)
